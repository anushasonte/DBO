package com.iit.dbo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "book_authors")
public class book_authors {
	private String b_title;
	@Id
	@Column(name = "doc_id", nullable = false)

	private String docid;
	private String b_author;
	
	public String getB_title() {
		return b_title;
	}
	public void setB_title(String b_title) {
		this.b_title = b_title;
	}
	
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	public String getB_author() {
		return b_author;
	}
	public void setB_author(String b_author) {
		this.b_author = b_author;
	}
	@Override
	public String toString() {
		return "book_authors [b_title=" + b_title + ", docid=" + docid + ", b_author=" + b_author + "]";
	}
	

	
	}