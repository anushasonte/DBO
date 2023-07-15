package com.iit.dbo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.Documents;
import com.iit.dbo.model.borrows;

@Repository
public interface BorrowsRepository extends JpaRepository<borrows, Long> {
	borrows findByDocid(String docid);
	
	List<borrows> findByUid(String uid);
}
