package com.iit.dbo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.Documents;
import com.iit.dbo.model.journal;

@Repository
public interface JournalRepository extends JpaRepository<journal, Long>{

	
	@Query(value = "SELECT j.* FROM librarymanagement.documents d INNER JOIN librarymanagement.journal j ON d.doc_id = j.doc_id WHERE j.doc_id = :docid ", nativeQuery = true)
	List<journal> findJournalDocumentsParamsNative(String docid);
}
