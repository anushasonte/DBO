package com.iit.dbo.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.AllBooksData;
import com.iit.dbo.model.Documents;
import com.iit.dbo.model.book_authors;
import com.iit.dbo.model.books;
import com.iit.dbo.model.journal;

@Repository
public interface BooksAuthorsRepository extends JpaRepository<book_authors, Long>{

//	@Transactional
//	@Query(value = "SELECT b.* FROM librarymanagement.books d INNER JOIN librarymanagement.book_authors b ON d.doc_id = b.doc_id WHERE b.doc_id = :docid ",nativeQuery = true)
//	List<book_authors> findBookAuthorsParamsNative(String docid);
}
