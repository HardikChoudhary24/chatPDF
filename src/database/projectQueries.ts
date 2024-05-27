export const insertProjectDetails =
  "Insert into PROJECT (project_name,pdfUrl,user_id,status) values($1,$2,$3,$4) RETURNING *;";

export const insertEmbeddings =
  "Insert into EMBEDDINGS (project_id,text_embedding,text_content) values($1,$2,$3) RETURNING *;";

export const selectNearest =
  "SELECT text_content FROM EMBEDDINGS WHERE project_id = $1 ORDER BY text_embedding <=> $2 LIMIT 10;";

export const insertMessage = `
  INSERT INTO MESSAGE_HISTORY (project_id, role, message)
  VALUES ($1, $2, $3);
`;

export const messageHistory =
  "SELECT role,message,created_at,id FROM MESSAGE_HISTORY WHERE project_id = $1 ORDER BY created_at;";

export const allUserProjects =
  "SELECT project_id,project_name,status,pdfurl FROM PROJECT WHERE PROJECT.user_id = $1;";

export const getProjectDetails =
  "SELECT project_id,project_name,status,pdfurl,user_id FROM PROJECT WHERE project_id = $1;";