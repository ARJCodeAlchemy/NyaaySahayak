const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");

const {
    getUserHistory,
    getHistoryById,
    deleteHistory,
} = require("../services/historyService");

router.get(
    "/history",
    authenticate,
    async (req, res, next) => {
        try {
            const history =
                await getUserHistory(
                    req.user.userId
                );

            res.status(200).json({
                success: true,
                history,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/history/:id",
    authenticate,
    async (req, res, next) => {
        try {
            const history =
                await getHistoryById(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                history,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    "/history/:id",
    authenticate,
    async (req, res, next) => {
        try {
            await deleteHistory(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "History deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;