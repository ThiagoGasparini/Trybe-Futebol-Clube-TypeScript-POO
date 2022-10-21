import TeamModel from '../database/models/teams';
import ITeam from '../interfaces/ITeam';

class TeamService {
  public model = TeamModel;

  public getAllTeams = async (): Promise<ITeam[]> => {
    const Teams = await this.model.findAll();
    return Teams;
  };

  public getById = async (id: string): Promise<ITeam> => {
    const getId = await this.model.findByPk(id);
    return getId as ITeam;
  };
}

export default TeamService;
