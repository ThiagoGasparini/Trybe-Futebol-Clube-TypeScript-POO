import MatchModel from '../database/models/matches';
import TeamModel from '../database/models/teams';
import IMatch from '../interfaces/IMatch';
import CustomError from '../errors/CustomError';

class TeamService {
  public model = MatchModel;

  public getAll = async (): Promise<MatchModel[]> => {
    const allMatches = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return allMatches;
  };

  public async getMatchesByProgress(inProgress: boolean): Promise<IMatch[]> {
    const team = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return team as unknown as IMatch[];
  }

  public createMatch = async (
    matchParams: Omit<MatchModel, 'id' | 'inProgress'>,
  ): Promise<MatchModel> => {
    const matchCreated = await this.model.create({ ...matchParams, inProgress: true });

    return matchCreated;
  };

  public finishMatch = async (id: string): Promise<void> => {
    const match = await MatchModel.findByPk(id);

    if (!match) throw new CustomError(404, 'There is no team with such id!');

    await match.update({ inProgress: false });
  };

  public updateMatch = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) : Promise<IMatch> => {
    const currentMatch = await MatchModel.findByPk(id);

    if (!currentMatch) throw new CustomError(404, 'There is no team with such id!');

    const updatedMatch = await currentMatch.update({
      homeTeamGoals,
      awayTeamGoals,
    });

    return updatedMatch as unknown as IMatch;
  };
}

export default TeamService;
