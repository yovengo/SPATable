import httpService from './http.service';

const dataEndpoint = 'api/';

const dataService = {
  get: async () => {
    const { data } = await httpService.get(dataEndpoint);
    return data;
  },
};
export default dataService;
