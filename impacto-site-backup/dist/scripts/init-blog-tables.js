"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_app_1 = require("../utils/supabase/server-app");
function initBlogTables() {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, categoriesError, tagsError, postsError, postsTagsError, rlsError, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, server_app_1.createClient)()];
                case 1:
                    supabase = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    return [4 /*yield*/, supabase.rpc('execute_sql', {
                            sql_query: "\n        CREATE TABLE IF NOT EXISTS blog_categories (\n          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n          name TEXT NOT NULL,\n          slug TEXT NOT NULL UNIQUE,\n          description TEXT,\n          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n        );\n        \n        -- Insert default category if none exists\n        INSERT INTO blog_categories (name, slug, description)\n        SELECT 'Uncategorized', 'uncategorized', 'Default category for blog posts'\n        WHERE NOT EXISTS (SELECT 1 FROM blog_categories WHERE slug = 'uncategorized');\n      "
                        })];
                case 3:
                    categoriesError = (_a.sent()).error;
                    if (categoriesError) {
                        console.error('Error creating blog_categories table:', categoriesError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase.rpc('execute_sql', {
                            sql_query: "\n        CREATE TABLE IF NOT EXISTS blog_tags (\n          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n          name TEXT NOT NULL,\n          slug TEXT NOT NULL UNIQUE,\n          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n        );\n        \n        -- Insert default tag if none exists\n        INSERT INTO blog_tags (name, slug)\n        SELECT 'General', 'general'\n        WHERE NOT EXISTS (SELECT 1 FROM blog_tags WHERE slug = 'general');\n      "
                        })];
                case 4:
                    tagsError = (_a.sent()).error;
                    if (tagsError) {
                        console.error('Error creating blog_tags table:', tagsError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase.rpc('execute_sql', {
                            sql_query: "\n        CREATE TABLE IF NOT EXISTS blog_posts (\n          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n          title TEXT NOT NULL,\n          slug TEXT NOT NULL UNIQUE,\n          content TEXT,\n          excerpt TEXT,\n          featured_image TEXT,\n          category_id BIGINT REFERENCES blog_categories(id) ON DELETE SET NULL,\n          published_at TIMESTAMP WITH TIME ZONE,\n          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n          author_name TEXT,\n          meta_title TEXT,\n          meta_description TEXT,\n          view_count BIGINT DEFAULT 0,\n          status TEXT DEFAULT 'published'\n        );\n        \n        -- Create index for performance\n        CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);\n        CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON blog_posts(category_id);\n      "
                        })];
                case 5:
                    postsError = (_a.sent()).error;
                    if (postsError) {
                        console.error('Error creating blog_posts table:', postsError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase.rpc('execute_sql', {
                            sql_query: "\n        CREATE TABLE IF NOT EXISTS blog_post_tags (\n          post_id BIGINT REFERENCES blog_posts(id) ON DELETE CASCADE,\n          tag_id BIGINT REFERENCES blog_tags(id) ON DELETE CASCADE,\n          PRIMARY KEY (post_id, tag_id)\n        );\n      "
                        })];
                case 6:
                    postsTagsError = (_a.sent()).error;
                    if (postsTagsError) {
                        console.error('Error creating blog_post_tags table:', postsTagsError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase.rpc('execute_sql', {
                            sql_query: "\n        -- Enable RLS on all tables\n        ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;\n        ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;\n        ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;\n        ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;\n        \n        -- Create policies for public reading\n        CREATE POLICY IF NOT EXISTS \"Allow public read access to published blog posts\" \n          ON blog_posts FOR SELECT USING (status = 'published');\n          \n        CREATE POLICY IF NOT EXISTS \"Allow public read access to categories\" \n          ON blog_categories FOR SELECT USING (true);\n          \n        CREATE POLICY IF NOT EXISTS \"Allow public read access to tags\" \n          ON blog_tags FOR SELECT USING (true);\n          \n        CREATE POLICY IF NOT EXISTS \"Allow public read access to published post tags\" \n          ON blog_post_tags FOR SELECT USING (\n            EXISTS (\n              SELECT 1 FROM blog_posts WHERE id = post_id AND status = 'published'\n            )\n          );\n      "
                        })];
                case 7:
                    rlsError = (_a.sent()).error;
                    if (rlsError) {
                        console.error('Error setting up RLS policies:', rlsError);
                        return [2 /*return*/];
                    }
                    console.log('Blog system successfully initialized!');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error initializing blog tables:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Run the initialization
initBlogTables().catch(console.error);
