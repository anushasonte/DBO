package com.iit.dbo.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "documents")
public class Documents {
	@Id
	private long id;

	@Column(name = "doc_id", nullable = false)

	private String docid;
	private String doc_category;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	private Integer doc_room_number;
	private Integer doc_room_level;
	private Integer doc_rack_number;
	private Integer doc_rack_level;
	private String doc_isdigitalversion;
	private String doc_isissuedby;
	private String doc_borrowedby;
	private Timestamp doc_issuedtimestamp;
	private Integer doc_totalnoofcopies;
	private Integer doc_noofcopiesavailable;
	private Timestamp doc_lastmodifiedtimestamp;
	
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	public String getDoc_category() {
		return doc_category;
	}
	public void setDoc_category(String doc_category) {
		this.doc_category = doc_category;
	}
	public Integer getDoc_room_number() {
		return doc_room_number;
	}
	public void setDoc_room_number(Integer doc_room_number) {
		this.doc_room_number = doc_room_number;
	}
	public Integer getDoc_room_level() {
		return doc_room_level;
	}
	public void setDoc_room_level(Integer doc_room_level) {
		this.doc_room_level = doc_room_level;
	}
	public Integer getDoc_rack_number() {
		return doc_rack_number;
	}
	public void setDoc_rack_number(Integer doc_rack_number) {
		this.doc_rack_number = doc_rack_number;
	}
	public Integer getDoc_rack_level() {
		return doc_rack_level;
	}
	public void setDoc_rack_level(Integer doc_rack_level) {
		this.doc_rack_level = doc_rack_level;
	}
	public String getDoc_isdigitalversion() {
		return doc_isdigitalversion;
	}
	public void setDoc_isdigitalversion(String doc_isdigitalversion) {
		this.doc_isdigitalversion = doc_isdigitalversion;
	}
	public String getDoc_isissuedby() {
		return doc_isissuedby;
	}
	public void setDoc_isissuedby(String doc_isissuedby) {
		this.doc_isissuedby = doc_isissuedby;
	}
	public String getDoc_borrowedby() {
		return doc_borrowedby;
	}
	public void setDoc_borrowedby(String doc_borrowedby) {
		this.doc_borrowedby = doc_borrowedby;
	}
	public Timestamp getDoc_issuedtimestamp() {
		return doc_issuedtimestamp;
	}
	public void setDoc_issuedtimestamp(Timestamp doc_issuedtimestamp) {
		this.doc_issuedtimestamp = doc_issuedtimestamp;
	}
	
	public Timestamp getDoc_lastmodifiedtimestamp() {
		return doc_lastmodifiedtimestamp;
	}
	public void setDoc_lastmodifiedtimestamp(Timestamp doc_lastmodifiedtimestamp) {
		this.doc_lastmodifiedtimestamp = doc_lastmodifiedtimestamp;
	}
	public Integer getDoc_totalnoofcopies() {
		return doc_totalnoofcopies;
	}
	public void setDoc_totalnoofcopies(Integer doc_totalnoofcopies) {
		this.doc_totalnoofcopies = doc_totalnoofcopies;
	}
	public Integer getDoc_noofcopiesavailable() {
		return doc_noofcopiesavailable;
	}
	public void setDoc_noofcopiesavailable(Integer doc_noofcopiesavailable) {
		this.doc_noofcopiesavailable = doc_noofcopiesavailable;
	}
	@Override
	public String toString() {
		return "Documents [docid=" + docid + ", doc_category=" + doc_category + ", doc_room_number=" + doc_room_number
				+ ", doc_room_level=" + doc_room_level + ", doc_rack_number=" + doc_rack_number + ", doc_rack_level="
				+ doc_rack_level + ", doc_isdigitalversion=" + doc_isdigitalversion + ", doc_isissuedby="
				+ doc_isissuedby + ", doc_borrowedby=" + doc_borrowedby + ", doc_issuedtimestamp=" + doc_issuedtimestamp
				+ ", doc_totalnoofcopies=" + doc_totalnoofcopies + ", doc_noofcopiesavailable="
				+ doc_noofcopiesavailable + ", doc_lastmodifiedtimestamp=" + doc_lastmodifiedtimestamp + "]";
	}
	
	
}
