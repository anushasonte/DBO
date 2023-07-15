package com.iit.dbo.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.AllBooksData;
import com.iit.dbo.model.Documents;
import com.iit.dbo.model.books;
import com.iit.dbo.model.journal;

@Repository
public interface BooksRepository extends JpaRepository<books, Long>{

	@Transactional
	@Query(value = "SELECT b.* FROM librarymanagement.documents d INNER JOIN librarymanagement.books b ON d.doc_id = b.doc_id WHERE b.doc_id = :docid ",nativeQuery = true)
	List<books> findBooksDocumentsParamsNative(String docid);
}
