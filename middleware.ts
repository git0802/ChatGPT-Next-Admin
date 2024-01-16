import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/api/prompt"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
