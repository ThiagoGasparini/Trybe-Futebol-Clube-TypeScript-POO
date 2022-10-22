import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getMatchesByProgress);

export default matchesRoute;
