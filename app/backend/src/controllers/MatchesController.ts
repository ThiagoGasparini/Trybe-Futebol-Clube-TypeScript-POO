import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamService = new TeamService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const allMatches = await this.matchesServices.getAll();

    return res.status(200).json(allMatches);
  };

  public getMatchesByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAll(req, res);
    }

    const query = inProgress === 'true';

    const filteredMatches = await this
      .matchesServices.getMatchesByProgress(query);

    return res.status(200).json(filteredMatches);
  };
}

export default MatchesController;
