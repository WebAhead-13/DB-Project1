BEGIN;

DROP TABLE IF EXISTS users, question_posts, post_answers CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin_flag INTEGER NOT NULL
  -- image VARCHAR(255) 
);

CREATE TABLE question_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_title VARCHAR(255) NOT NULL,
  text_content TEXT,
  anonymous_flag INTEGER NOT NULL
);

CREATE TABLE post_answers(
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES question_posts(id),
    user_id INTEGER REFERENCES users(id),
    text_content TEXT
);

INSERT INTO users (username, email, password , admin_flag) VALUES 
('Doaa','doaaziadat@gmail.com','123',1),
('Sara','sara@gmail.com','123',0);

-- ('Doaa','doaaziadat@gmail.com','123',1 ,'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'),
-- ('Sara','sara@gmail.com','123',0 , 'https://images.unsplash.com/photo-1532170579297-281918c8ae72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzM4MTMxOHx8ZW58MHx8fHw%3D&w=1000&q=80');

INSERT INTO question_posts (user_id, text_title, text_content, anonymous_flag) VALUES 
(2,'How To Overcome Obstacles In Life ?','hello , I am 20 years old and I have a proplem , any advice would help me ..',0),
(1,'What are ten truths everyone should accept in life?',' I think one truth would be: Making mistakes is better than faking perfections.',1);

INSERT INTO post_answers (post_id, user_id, text_content) VALUES 
(1,1,'Stay positive. When you are worried about something it’s hard to stay positive, but think about the good things that could come from the difficult decision you have to make or the hard conversation you have to have.'); 


COMMIT;