require("pretty-error").start();
const { models } = require("../model");
const User = models.user;
const Permission = models.permission;
const Role_Permission = models.role_permission;
const { ErrorResponse } = require("../middleware/errorHandler");
const log = require("log4js").getLogger("auth");
log.level = "info";

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new ErrorResponse("Unauthorized, Token is empty", 401));
    }

    const user = await User.findOne({ where: { apiKey: token }, raw: true });
    if (token !== user.apiKey) {
      return next(new ErrorResponse("Unauthorized, Token Not Valid", 401));
    }

    // * Saving Session
    req.session.user = user.id;
    req.session.name = user.name;
    req.session.roleId = user.roleId;

    next();
  } catch (err) {
    log.error("Auth Middleware Error:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

exports.checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.role)) {
      return next(
        new ErrorResponse("role is not authorize to access this route", 400)
      );
    }
    next();
  };
};

exports.checkPerm = (permName) => {
  return async (req, res, next) => {
    const roleId = req.session.roleId;
    if (!roleId || !permName) {
      return next(new ErrorResponse("role/permission not found", 400));
    }

    // * Cek Permission, where permissionName
    const permission = await Permission.findOne({
      where: { name: permName },
      attributes: [id],
      raw: true,
    });
    if (!permission) {
      return next(new ErrorResponse("invalid permission", 403));
    }

    const rolePerm = await Role_Permission.findOne({
      where: { roleId, permissionid: permission.id },
    });
    if (!rolePerm) {
      return next(new ErrorResponse("you dont have permission", 403));
    }

    next();
  };
};
