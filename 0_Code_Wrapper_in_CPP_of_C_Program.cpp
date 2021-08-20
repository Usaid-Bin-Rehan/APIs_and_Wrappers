/* Sophisticated C Program

int pthread_mutex_init(pthread_mutex_t * mutex , pthread_mutexattr_t * attr);
int pthread_mutex_destroy (pthread_mutex_t * mutex);
int pthread_mutex_lock (pthread_mutex_t * mutex );
int pthread_mutex_unlock (pthread_mutex_t * mutex ); */

/* Easier to use C++ Wrapper Interface: */

class Mutex
{
	public:
    	Mutex() 
    	{
        	pthread_mutex_init(&mutex, 0);
    	}

    	~Mutex()
    	{
        	pthread_mutex_destroy(&mutex);
    	}

	private:
    	friend class Lock;

    	void lock()
    	{
        	pthread_mutex_lock(&mutex);
    	}

    	void unlock()
    	{
        	pthread_mutex_unlock(&mutex);
    	}
    	
    	pthread_mutex_t mutex;
};

class Lock
{
	private:
    	Mutex &mutex;

	public:
    	Lock(Mutex &mutex): mutex{mutex}
    	{
        	mutex.lock();
    	}

    	~Lock()
    	{
        	mutex.unlock();
    	}
};
