package com.iit.dbo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "journal_authors")
public class journal_authors {
	@Id
	@Column(name = "doc_id", nullable = false)
	private String docid;
	private String j_name;
	private String j_author;
	
	
	public String getJ_name() {
		return j_name;
	}
	public void setJ_name(String j_name) {
		this.j_name = j_name;
	}
	public String getJ_author() {
		return j_author;
	}
	public void setJ_author(String j_author) {
		this.j_author = j_author;
	}
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	@Override
	public String toString() {
		return "journal_authors [docid=" + docid + ", j_name=" + j_name + ", j_author=" + j_author + "]";
	}

	
}
