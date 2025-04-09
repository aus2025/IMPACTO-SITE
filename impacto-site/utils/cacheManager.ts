/**
 * Cache management utilities for optimizing data fetching and storage
 */

interface CacheOptions {
  /** Cache expiration time in seconds */
  ttl?: number;
  /** Whether to refresh cache in the background */
  backgroundRefresh?: boolean;
  /** Storage mechanism: 'localStorage', 'sessionStorage', or 'memory' */
  storage?: 'localStorage' | 'sessionStorage' | 'memory';
}

interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiry: number;
}

// In-memory cache storage
const memoryCache: Record<string, CacheItem<any>> = {};

/**
 * Gets an item from cache
 * 
 * @param key Cache key
 * @param options Cache options
 * @returns The cached value or null if not found/expired
 */
export const getCache = <T>(
  key: string, 
  options: CacheOptions = {}
): T | null => {
  const { storage = 'localStorage' } = options;
  
  try {
    let cacheItem: CacheItem<T> | null = null;
    
    // Get from selected storage
    if (storage === 'memory') {
      cacheItem = memoryCache[key] as CacheItem<T> || null;
    } else if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      const item = storageObj.getItem(key);
      
      if (item) {
        cacheItem = JSON.parse(item) as CacheItem<T>;
      }
    }
    
    // Check if cache exists and is valid
    if (cacheItem) {
      const now = Date.now();
      
      // Return if not expired
      if (now < cacheItem.expiry) {
        return cacheItem.value;
      }
    }
    
    return null;
  } catch (error) {
    console.warn(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

/**
 * Sets an item in cache
 * 
 * @param key Cache key
 * @param value Value to cache
 * @param options Cache options
 */
export const setCache = <T>(
  key: string, 
  value: T, 
  options: CacheOptions = {}
): void => {
  const { 
    ttl = 3600, // 1 hour default
    storage = 'localStorage' 
  } = options;
  
  try {
    const now = Date.now();
    const cacheItem: CacheItem<T> = {
      value,
      timestamp: now,
      expiry: now + (ttl * 1000),
    };
    
    // Store in selected storage
    if (storage === 'memory') {
      memoryCache[key] = cacheItem;
    } else if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      storageObj.setItem(key, JSON.stringify(cacheItem));
    }
  } catch (error) {
    console.warn(`Error setting cache for key ${key}:`, error);
  }
};

/**
 * Removes an item from cache
 * 
 * @param key Cache key
 * @param options Cache options
 */
export const removeCache = (
  key: string, 
  options: CacheOptions = {}
): void => {
  const { storage = 'localStorage' } = options;
  
  try {
    // Remove from selected storage
    if (storage === 'memory') {
      delete memoryCache[key];
    } else if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      storageObj.removeItem(key);
    }
  } catch (error) {
    console.warn(`Error removing cache for key ${key}:`, error);
  }
};

/**
 * Clears all cached items
 * 
 * @param options Cache options
 */
export const clearCache = (options: CacheOptions = {}): void => {
  const { storage = 'localStorage' } = options;
  
  try {
    // Clear selected storage
    if (storage === 'memory') {
      Object.keys(memoryCache).forEach(key => {
        delete memoryCache[key];
      });
    } else if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      storageObj.clear();
    }
  } catch (error) {
    console.warn('Error clearing cache:', error);
  }
};

/**
 * Gets an item from cache with fetch fallback
 * Will attempt to get from cache first, if not available or expired, 
 * will call fetchFn and cache the result
 * 
 * @param key Cache key
 * @param fetchFn Function to call if cache miss occurs
 * @param options Cache options
 * @returns The cached or freshly fetched value
 */
export const getCacheOrFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> => {
  const { backgroundRefresh = false } = options;
  
  // Try to get from cache first
  const cachedValue = getCache<T>(key, options);
  
  // If we have a cached value, return it
  if (cachedValue !== null) {
    // If background refresh is enabled, refresh the cache asynchronously
    if (backgroundRefresh) {
      // Use setTimeout to make this non-blocking
      setTimeout(async () => {
        try {
          const freshValue = await fetchFn();
          setCache(key, freshValue, options);
        } catch (error) {
          console.warn(`Background refresh failed for key ${key}:`, error);
        }
      }, 0);
    }
    
    return cachedValue;
  }
  
  // If not in cache or expired, fetch and cache the value
  try {
    const value = await fetchFn();
    setCache(key, value, options);
    return value;
  } catch (error) {
    console.error(`Error fetching value for key ${key}:`, error);
    throw error;
  }
}; 