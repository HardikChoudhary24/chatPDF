export const insertProjectDetails =
  "Insert into PROJECT (project_name,pdfUrl,user_id,status) values($1,$2,$3,$4) RETURNING *;";
export const insertEmbeddings =
  "Insert into EMBEDDINGS (project_id,text_embedding,text_content) values($1,$2,$3) RETURNING *;";