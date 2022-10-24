import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateMatches from '../middlewares/matchValidation';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getMatchesByProgress);
matchesRoute.post('/', validateMatches, matchesController.createMatch);
matchesRoute.patch('/:id/finish', matchesController.finishMatch);
matchesRoute.patch('/:id', matchesController.updateMatch);

export default matchesRoute;
