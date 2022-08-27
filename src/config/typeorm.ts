const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

const config = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production', // 生产环境不要开启
  autoLoadEntities: true, // 如果为true,将自动加载实体(默认：false)
  keepConnectionAlive: true, // 如果为true，在应用程序关闭后连接不会关闭（默认：false)
  retryDelay: 3000, // 两次重试连接的间隔(ms)（默认：3000）
  retryAttempts: 10, // 重试连接数据库的次数（默认：10）
  dateStrings: 'DATETIME', // 转化为时间
  timezone: '+0800', // +HHMM -HHMM
  // 自动需要导入模型
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export default config;
