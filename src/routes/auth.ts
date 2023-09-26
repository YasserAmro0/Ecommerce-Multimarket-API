import { Router } from 'express';
import { Signup, LoginUser, LoginAdmin, getAuth  } from '../controllers';
import { checkToken } from '../middlewares';

const router = Router();

router.post('/signup', Signup);
router.post('/login', LoginUser);
router.get('/', checkToken, getAuth);
router.post('/login/admin', LoginAdmin);

export default router;