namespace NotificationsAPI.Service;

public interface ICollectionService<T> where T : class
{
	Task<List<T>> GetAll();
	
	Task<T> Get(Guid id);
	
	Task<bool> Create(T entity);

	Task<bool> Update(Guid id, T entity);
	
	Task<bool> Delete(Guid id);
}
