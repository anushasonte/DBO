package com.iit.dbo.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "books")
public class books {
	private String b_title;
	@Id
	@Column(name = "doc_id", nullable = false)
	private String docid;

	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	private Date b_edition;
	private String b_pubid;
	private String b_genre;
	public String getB_title() {
		return b_title;
	}
	public void setB_title(String b_title) {
		this.b_title = b_title;
	}
	
	
	public String getB_pubid() {
		return b_pubid;
	}
	public void setB_pubid(String b_pubid) {
		this.b_pubid = b_pubid;
	}
	public String getB_genre() {
		return b_genre;
	}
	public void setB_genre(String b_genre) {
		this.b_genre = b_genre;
	}
	public Date getB_edition() {
		return b_edition;
	}
	public void setB_edition(Date b_edition) {
		this.b_edition = b_edition;
	}
	@Override
	public String toString() {
		return "books [b_title=" + b_title + ", docid=" + docid + ", b_edition=" + b_edition + ", b_pubid=" + b_pubid
				+ ", b_genre=" + b_genre + "]";
	}
	
	

}
