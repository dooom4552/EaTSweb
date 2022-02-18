class TutorialDataService {
  getAll(params: { page: number; size: number }) {
    return new Promise((resolve) => {
      const response = {
        data: {
          tutorials: [{}],
          totalPages: 10,
        },
      };
      for (let index = 0; index < 9; index++) {
        response.data.tutorials.push({
          id: index,
          title: ++index,
          description: params.size + index,
          status: params.page,
        });
      }
      resolve(response);
    });
  }
  // other CRUD methods
}
export default new TutorialDataService();
