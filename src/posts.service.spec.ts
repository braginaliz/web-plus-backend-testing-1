import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const initialPost: Omit<Post, 'id' | 'date'> = {
    text: 'Some pre-existing post',
  };
  const newPost: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(() => {
    postsService = new PostsService();
    // Создаем начальный пост для тестирования
    postsService.create(initialPost);
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(newPost);
    
    // Проверяем, что пост был добавлен
    expect(createdPost.text).toEqual(newPost.text);
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();

    // Проверяем, что создали один новый пост
    const allPosts = postsService.getAll(); // Метод, чтобы получить список всех постов
    expect(allPosts.length).toBe(2); // Один изначальный и один созданный пост
  });

  it('should find a post by ID', () => {
    // Создаем пост для поиска
    const createdPost = postsService.create(newPost);
    
    // Ищем пост по ID
    const foundPost = postsService.find(createdPost.id);
    
    // Проверяем, что найденный пост существует и совпадает с созданным
    expect(foundPost).toBeDefined();
    expect(foundPost!.id).toEqual(createdPost.id);
    expect(foundPost!.text).toEqual(createdPost.text);
    expect(foundPost!.date).toEqual(createdPost.date);
  });

  it('should return undefined when post not found', () => {
    const nonExistentPostId = 'non-existent-id'; // пример ID, который не существует

    // Ищем пост с несуществующим ID
    const foundPost = postsService.find(nonExistentPostId);

    // Проверяем, что не найден пост
    expect(foundPost).toBeUndefined();
  });
});