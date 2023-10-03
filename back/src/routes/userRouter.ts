import { Router } from 'express';
import { 
    userLogin, 
    userRegister, 
    getMyInfo,
    getAllUser,
    getUserId,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { localAuthentication } from '../middlewares/authenticateLocal';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
const userAuthRouter = Router();

userAuthRouter.post('/register', userRegister);

userAuthRouter.post('/login', localAuthentication, userLogin);

userAuthRouter.get('/current', jwtAuthentication, getMyInfo);

userAuthRouter.get('/allUser',getAllUser);

userAuthRouter.route('/:userId')
    .get(jwtAuthentication, getUserId)
    .put(jwtAuthentication, updateUser)
    .delete(jwtAuthentication, deleteUser);


export default userAuthRouter;