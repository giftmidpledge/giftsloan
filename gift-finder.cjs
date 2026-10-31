/**
 * gift-finder.js — Справочник атрибутов Telegram Gifts на основе api.changes.tg
 * 
 * ВАЖНО: Этот модуль больше не ищет номера подарков перебором. 
 * Он предоставляет справочники (модели, фоны, узоры) для коллекций.
 * Поиск конкретного подарка по атрибутам должен осуществляться через TonAPI или вручную.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const DATA_DIR = process.env.GIFT_INDEX_DIR || path.join(__dirname, 'gift-index');
const CHANGES_API = 'https://api.changes.tg';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 часов

fs.mkdirSync(DATA_DIR, { recursive: true });

const slugOf = (name) => String(name || '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Кэш в памяти: slug -> { models, backdrops, symbols, ts }
const cache = new Map();

async function fetchJson(url) {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
}

// Нормализация ответа api.changes.tg (он может быть массивом или объектом)
function normalizeList(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(x => typeof x === 'string' ? { name: x } : x);
    if (typeof raw === 'object') {
        // Если это карта имя->данные
        return Object.entries(raw).map(([k, v]) => {
            if (typeof v === 'object') return { name: k, ...v };
            return { name: k };
        });
    }
    return [];
}

/**
 * Загружает полный справочник для коллекции (модели, фоны, узоры)
 * @param {string} giftName - Название коллекции, например "Big Year"
 */
async function loadAttributes(giftName) {
    const slug = slugOf(giftName);
    const cached = cache.get(slug);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
        return cached;
    }

    console.log(`--> Загружаем справочник атрибутов для "${giftName}" (${slug})...`);

    try {
        // api.changes.tg отдает все три списка одним запросом /gift/:gift
        // Но для надежности можно использовать отдельные эндпоинты, если первый не работает
        const data = await fetchJson(`${CHANGES_API}/gift/${encodeURIComponent(giftName)}`);
        
        const result = {
            models: normalizeList(data.models),
            backdrops: normalizeList(data.backdrops),
            symbols: normalizeList(data.symbols),
            ts: Date.now()
        };

        // Если данные пустые, пробуем отдельные эндпоинты (на случай изменения API)
        if (!result.models.length && !result.backdrops.length && !result.symbols.length) {
            console.warn(`[gift-finder] /gift/${giftName} вернул пусто, пробуем отдельные эндпоинты...`);
            const [models, backdrops, symbols] = await Promise.all([
                fetchJson(`${CHANGES_API}/models/${encodeURIComponent(giftName)}`).catch(() => []),
                fetchJson(`${CHANGES_API}/backdrops/${encodeURIComponent(giftName)}`).catch(() => []),
                fetchJson(`${CHANGES_API}/symbols/${encodeURIComponent(giftName)}`).catch(() => [])
            ]);
            result.models = normalizeList(models);
            result.backdrops = normalizeList(backdrops);
            result.symbols = normalizeList(symbols);
        }

        cache.set(slug, result);
        console.log(`✅ Справочник "${giftName}" загружен: ${result.models.length} моделей, ${result.backdrops.length} фонов, ${result.symbols.length} узоров`);
        
        // Сохраняем на диск для переживания перезапусков
        try {
            fs.writeFileSync(path.join(DATA_DIR, `${slug}.json`), JSON.stringify(result));
        } catch (e) { /* ignore */ }

        return result;
    } catch (e) {
        console.error(`[gift-finder] Ошибка загрузки для "${giftName}":`, e.message);
        
        // Пробуем загрузить с диска
        try {
            const saved = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${slug}.json`), 'utf8'));
            if (saved && saved.models) {
                cache.set(slug, saved);
                return saved;
            }
        } catch (e2) { /* ignore */ }

        // Возвращаем пустой справочник, чтобы не ронять сервер
        return { models: [], backdrops: [], symbols: [], ts: 0 };
    }
}

/**
 * Возвращает справочник атрибутов для коллекции
 * Используется в оракуле для отдачи на фронтенд
 */
async function getAttributes(giftName) {
    if (!giftName) return { models: [], backdrops: [], symbols: [] };
    return await loadAttributes(giftName);
}

// HTTP-сервер для автономного запуска (если нужно)
function send(res, code, body) {
    res.writeHead(code, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
    });
    res.end(JSON.stringify(body));
}

async function expressHandler(req, res) {
    try {
        const q = req.query || Object.fromEntries(new URL(req.url, 'http://x').searchParams);
        const gift = q.gift;
        if (!gift) {
            return send(res, 400, { ok: false, error: 'gift required' });
        }
        const attrs = await getAttributes(gift);
        send(res, 200, { ok: true, gift, ...attrs });
    } catch (e) {
        send(res, 500, { ok: false, error: String(e && e.message || e) });
    }
}

module.exports = { getAttributes, expressHandler };

if (require.main === module) {
    const port = parseInt(process.env.PORT || '8787', 10);
    http.createServer((req, res) => {
        if (req.method === 'OPTIONS') {
            res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
            return res.end();
        }
        const u = new URL(req.url, 'http://x');
        if (u.pathname === '/gift-attrs') {
            return expressHandler({ query: Object.fromEntries(u.searchParams) }, res);
        }
        send(res, 404, { ok: false });
    }).listen(port, () => console.log('gift-finder (attributes) on :' + port));
}
