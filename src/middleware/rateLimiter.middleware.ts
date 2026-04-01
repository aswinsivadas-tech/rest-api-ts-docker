import rateLimit from "express-rate-limit";

// general API Limiter
export const apiLimiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 mins
limit: 100, // Limit each IP to 100 requests
standardHeaders: 'draft-7',
legacyHeaders: false,
message: 'Too many requests from this IP, please try again later.',
});

//  Stricter Limiter for auth endpoints
export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5mins
    // limit login/register attempts
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many login attempts, please try again later',
});