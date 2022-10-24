import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/home', leaderboardController.getHomeLeaderboard);

export default leaderboardRoute;
