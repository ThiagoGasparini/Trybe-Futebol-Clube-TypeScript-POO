import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamService = new TeamService(),
  ) {}

  public getAll = async (_req: Request, res: Response) => {
    const allMatches = await this.matchesServices.getAll();

    return res.status(200).json(allMatches);
  };

  public getMatchesByProgress = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAll(req, res);
    }

    const query = inProgress === 'true';

    const filteredMatches = await this.matchesServices.getMatchesByProgress(
      query,
    );

    return res.status(200).json(filteredMatches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const match = req.body;

    const isTeamsIdValid = await this.teamService.getById(match.homeTeam);
    const isTeamsIdValid2 = await this.teamService.getById(match.awayTeam);

    if (!isTeamsIdValid || !isTeamsIdValid2) {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }

    const matchCreated = await this.matchesServices.createMatch(match);

    return res.status(201).json(matchCreated);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesServices.finishMatch(id);

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchUpdated = await this.matchesServices.updateMatch(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(200).json(matchUpdated);
  };
}

export default MatchesController;
