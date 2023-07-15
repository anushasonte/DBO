package com.iit.dbo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.thesis;

@Repository
public interface ThesisRepository extends JpaRepository<thesis, Long>{

//	@Transactional
//	@Query(value = "SELECT b.* FROM librarymanagement.books d INNER JOIN librarymanagement.book_authors b ON d.doc_id = b.doc_id WHERE b.doc_id = :docid ",nativeQuery = true)
//	List<book_authors> findBookAuthorsParamsNative(String docid);
}
