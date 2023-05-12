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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield usuario_1.default.findAll();
    res.json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usuario_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }
    res.json({
        user
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { is_active, email } = _a, data = __rest(_a, ["is_active", "email"]);
    try {
        const isEmail = yield usuario_1.default.findOne({ where: { email } });
        const newUser = usuario_1.default.build(data);
        if (isEmail) {
            return res.status(404).json({
                msg: 'Ya existe un email así en la base de datos'
            });
        }
        newUser.save();
        res.json({
            status: 201,
            newUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error al crear el usuario revisa la consola'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { is_active, createdAt, updatedAt } = _b, data = __rest(_b, ["is_active", "createdAt", "updatedAt"]);
    const user = yield usuario_1.default.findByPk(id);
    if (!usuario_1.default) {
        return res.status(404).json({
            msg: 'El usuario con esa id no existe'
        });
    }
    yield (user === null || user === void 0 ? void 0 : user.update(data));
    res.json({
        msg: 'updateUser',
        user
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usuario_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }
    yield (user === null || user === void 0 ? void 0 : user.update({ is_active: false }));
    res.json({
        msg: 'Usuario ' + id + ' eliminado correctamente:',
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map