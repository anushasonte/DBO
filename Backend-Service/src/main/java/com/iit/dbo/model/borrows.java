package com.iit.dbo.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "borrows")
public class borrows {
	@Id
	@Column(name = "doc_id", nullable = false)
	private String docid;
	@Column(name = "u_id", nullable = false)

	private String uid;
	private LocalDate borrowtime;
	
	public LocalDate getBorrowtime() {
		return borrowtime;
	}
	public void setBorrowtime(LocalDate localDate) {
		this.borrowtime = localDate;
	}

	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	@Override
	public String toString() {
		return "borrows [docid=" + docid + ", uid=" + uid + ", borrowtime=" + borrowtime + "]";
	}
	


}
