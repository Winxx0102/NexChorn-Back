"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
async function bootstrap(expressApp) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: 'https://nex-chorn-front.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    return app;
}
if (process.env.NODE_ENV !== 'production') {
    const server = (0, express_1.default)();
    bootstrap(server).then((app) => {
        server.listen(3000, () => console.log('🚀 Local: http://localhost:3000'));
    });
}
//# sourceMappingURL=main.js.map