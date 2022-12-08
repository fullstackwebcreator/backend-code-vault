import { Cookie } from "express-session";
import User from "interfaces/user.interface";

interface SessionData {
	user: User;
	view: any;
	cookie: Cookie;
}
