import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const isProd = process.env.NODE_ENV === 'production';

const localEnv = path.resolve('.env.local');
const prodEnv = path.resolve('.env.prod');

const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;

// 配置 通过process.env.xx读取变量
dotenv.config({ path: filePath });
