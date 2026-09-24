//N 1_ Redis is a in memory data structure

//N 2_ Redis keeps the data mainly in the RAM, read and write opertaions using Redis becomes really fast.

//N 3_ Redis can be used to implement -> cache, rate limiter, message broker, temp fast layer infront of the main DB.

//N 4_ PostgresSQL is used for the permanent structured data. But Redis cache is helpful in:-
    //| i> Caching product list
    //| ii> count product views
    //| iii> limit how many requests a user can make
    //| iv> Running background jobs
    //| v> Redis cache is short lived and is used for the frequent accessed data.

//N 5_ Postgres stores the data in the disk so it is permanant storage but redis stores the data in ram so it's really fast but short-lived.