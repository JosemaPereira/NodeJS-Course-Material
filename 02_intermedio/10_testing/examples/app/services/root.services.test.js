import { testingDB, blog } from '../database/index.js';
import { RootServices } from './root.services.js';

beforeAll(async () => await testingDB.create());
beforeAll(async () => await testingDB.connect());
afterEach(async () => await testingDB.clear());
afterAll(async () => await testingDB.close());

describe('blog collection', () => {
  const defaultResponse = {
    author: 'foo',
    title: 'bar',
  };
  const defaultRequestByID = { params: { id: '123' } };

  it('get blog entries fail', async () => {
    jest.spyOn(blog.model, 'find').mockReturnValue(Error('common error'));
    await expect(RootServices.get()).rejects.toThrow();
  });

  it('get blog entries', async () => {
    jest.spyOn(blog.model, 'find').mockReturnValue([defaultResponse]);
    await expect(RootServices.get()).not.toBeNull();
  });

  it('get blog entry by id', async () => {
    jest.spyOn(blog.model, 'findById').mockReturnValue(defaultResponse);
    await expect(RootServices.getById(defaultRequestByID)).not.toBeNull();
  });
  it('get blog entry by id fail', async () => {
    jest.spyOn(blog.model, 'findById').mockReturnValue(undefined);
    await expect(RootServices.getById(defaultRequestByID)).rejects.toThrow();
  });

  it('create new entry', async () => {
    const mockModel = new blog.model();
    jest.spyOn(mockModel, 'save').mockReturnValue(defaultResponse);
    await expect(RootServices.post({ body: defaultResponse })).not.toBeNul;
  });

  it('create new entry fail', async () => {
    const mockModel = new blog.model();
    jest.spyOn(mockModel, 'save').mockReturnValue(Error('common error'));
    await expect(RootServices.post({ body: {} })).rejects.toThrow();
  });

  it('update blog entry', async () => {
    jest.spyOn(blog.model, 'findOneAndUpdate').mockReturnValue(defaultResponse);
    await expect(
      RootServices.put({ body: defaultResponse, ...defaultRequestByID }),
    ).not.toBeNull();
  });

  it('update blog entry by id fail', async () => {
    jest.spyOn(blog.model, 'findOneAndUpdate').mockReturnValue(undefined);
    await expect(
      RootServices.put({ body: defaultResponse, ...defaultRequestByID }),
    ).rejects.toThrow();
  });

  it('delete blog entry', async () => {
    jest.spyOn(blog.model, 'deleteOne').mockReturnValue({ deletedCount: 1 });
    await expect(
      RootServices.delete({ body: defaultResponse, ...defaultRequestByID }),
    ).not.toBeNull();
  });

  it('delete blog entry fail', async () => {
    jest.spyOn(blog.model, 'deleteOne').mockReturnValue(undefined);
    await expect(
      RootServices.delete({ body: defaultResponse, ...defaultRequestByID }),
    ).rejects.toThrow();
  });
});
