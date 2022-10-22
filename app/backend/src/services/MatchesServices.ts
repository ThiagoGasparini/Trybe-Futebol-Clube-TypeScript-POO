import MatchModel from '../database/models/matches';
import TeamModel from '../database/models/teams';
import IMatch from '../interfaces/IMatch';

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
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return team as unknown as IMatch[];
  }
}

export default TeamService;
