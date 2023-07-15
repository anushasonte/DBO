package com.iit.dbo.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.HeadersBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iit.dbo.config.JwtTokenProvider;
import com.iit.dbo.exception.ResourceNotFoundException;
import com.iit.dbo.model.AllBooksData;
import com.iit.dbo.model.Documents;
import com.iit.dbo.model.Employee;
import com.iit.dbo.model.JWTAuthResponse;
import com.iit.dbo.model.LoginAuth;
import com.iit.dbo.model.LoginDto;
import com.iit.dbo.model.book_authors;
import com.iit.dbo.model.books;
import com.iit.dbo.model.borrows;
import com.iit.dbo.model.journal;
import com.iit.dbo.model.journal_authors;
import com.iit.dbo.model.magazine_contributors;
import com.iit.dbo.model.thesis;
import com.iit.dbo.repository.BooksAuthorsRepository;
import com.iit.dbo.repository.BooksRepository;
import com.iit.dbo.repository.BorrowsRepository;
import com.iit.dbo.repository.DocumentsRepository;
import com.iit.dbo.repository.JournalAuthorsRepository;
import com.iit.dbo.repository.JournalRepository;
import com.iit.dbo.repository.LoginRepository;
import com.iit.dbo.repository.MagazineRepository;
import com.iit.dbo.repository.ThesisRepository;

@RestController
@CrossOrigin(origins = "*")

@RequestMapping("/api/v1")
public class LibraryController {
	@Autowired
	private BorrowsRepository borrowsRepository;
	@Autowired
	private JournalRepository journalRepository;
	@Autowired
	private MagazineRepository magazineRepository;
	@Autowired
	private ThesisRepository thesisRepository;
	@Autowired
	private BooksRepository booksRepository;
	@Autowired
	private BooksAuthorsRepository bookauthorsRepository;
	@Autowired
	private JournalAuthorsRepository journalauthorsRepository;
	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private DocumentsRepository documentsRepository;
	@Autowired
    private AuthenticationManager authenticationManager;
	@Autowired
    private JwtTokenProvider tokenProvider;
//	
//	@GetMapping("/employees")
//	public List<Employee> getAllEmployees() {
//		return employeeRepository.findAll();
//	}
	@CrossOrigin(origins = "*")
	@GetMapping("/documents")
	public List<Documents> getAllDocuments() {
		return documentsRepository.findAll();
	}
	
//	@GetMapping("/documents/{docid}")
//	public ResponseEntity<Documents> getdocumentbyid(@PathVariable(value = "docid") String docid,
//		@Valid @RequestBody Documents docdetails) throws ResourceNotFoundException {
//		Documents document = documentsRepository.findByDocid(docid).orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + docid));;
//		return ResponseEntity.ok().body(document);
//	}
	@GetMapping("/journaldocuments/{docid}")
	public ResponseEntity<List<journal>> getJournaldocsById(@PathVariable(value = "docid") String docid)
			throws ResourceNotFoundException {
		List<journal> journal = journalRepository.findJournalDocumentsParamsNative(docid);
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(journal);
	}
	
	@GetMapping("/bookdocuments")
	public ResponseEntity<List<books>> getBooksdocsById()
			throws ResourceNotFoundException {
		List<books> books = booksRepository.findAll();
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(books);
	}
	@GetMapping("/bookauthors")
	public ResponseEntity<List<book_authors>> getBooksAuthors()
			throws ResourceNotFoundException {
		List<book_authors> book_authors = bookauthorsRepository.findAll();
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(book_authors);
	}
	@GetMapping("/journalauthors")
	public ResponseEntity<List<journal_authors>> getJournalAuthors()
			throws ResourceNotFoundException {
		List<journal_authors> journal_authors = journalauthorsRepository.findAll();
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(journal_authors);
	}
	@GetMapping("/magazineauthors")
	public ResponseEntity<List<magazine_contributors>> getMagazineAuthors()
			throws ResourceNotFoundException {
		List<magazine_contributors> magazine_contributors = magazineRepository.findAll();
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(magazine_contributors);
	}
	
	@GetMapping("/thesisauthors")
	public ResponseEntity<List<thesis>> getThesisAuthors()
			throws ResourceNotFoundException {
		List<thesis> thesis = thesisRepository.findAll();
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(thesis);
	}
	@GetMapping("/getIdByUsername/{username}")
	public ResponseEntity<List<LoginAuth>> getIdByUsername(@PathVariable(value = "username") String username)
			throws ResourceNotFoundException {
		List<LoginAuth> login = loginRepository.findIdByUsername(username);
//				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(login);
	}
	@CrossOrigin(origins = "*")

	@GetMapping("/usertypes")
	public List<LoginAuth> getAllUserTypes() {
		return loginRepository.findUserTypes();
	}

	@GetMapping("/documents/{id}")
	public ResponseEntity<Documents> getDocumentById(@PathVariable(value = "id") Long id)
			throws ResourceNotFoundException {
		Documents document = documentsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + id));
		return ResponseEntity.ok().body(document);
	}
	
	
	@GetMapping("/borrows/{uid}")
	public ResponseEntity<List<borrows>> getborrowersById(@PathVariable(value = "uid") String uid)
			throws ResourceNotFoundException {
		List<borrows> borrower = borrowsRepository.findByUid(uid);
				
		return ResponseEntity.ok().body(borrower);
	}
//
	@PostMapping("/adddocuments")
	public Documents createDocument(@Valid @RequestBody Documents doc) {
		return documentsRepository.save(doc);
	}
	
//
	@CrossOrigin(origins = "*")
	@PutMapping("/documents/{docid}")
	public ResponseEntity<Documents> updatedocument(@PathVariable(value = "docid") String docid,
			@Valid @RequestBody Documents docdetails) throws ResourceNotFoundException {
		Documents document = documentsRepository.findByDocid(docid)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + docid));

		document.setDoc_category(docdetails.getDoc_category());
		document.setDoc_isdigitalversion(docdetails.getDoc_isdigitalversion());
		document.setDoc_borrowedby(docdetails.getDoc_borrowedby());
		document.setDoc_isissuedby(docdetails.getDoc_borrowedby());
		document.setDoc_noofcopiesavailable(docdetails.getDoc_noofcopiesavailable());
		document.setDoc_rack_level(docdetails.getDoc_rack_level());
		document.setDoc_rack_number(docdetails.getDoc_rack_number());
		document.setDoc_room_level(docdetails.getDoc_room_level());
		document.setDoc_room_number(docdetails.getDoc_room_number());
		document.setDoc_totalnoofcopies(docdetails.getDoc_totalnoofcopies());
		
		final Documents updatedDocuemnt = documentsRepository.save(document);
		return ResponseEntity.ok(updatedDocuemnt);
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/borrowdocuments/{docid}/{u_id}")
	public ResponseEntity<Documents> borrowdocument(@PathVariable(value = "docid") String docid,@PathVariable(value = "u_id") String u_id,
			@Valid @RequestBody Documents docdetails) throws ResourceNotFoundException {
		Documents document = documentsRepository.findByDocid(docid)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + docid));
		borrows borrows= new borrows();
	
		document.setDoc_noofcopiesavailable(document.getDoc_noofcopiesavailable()-1);
		borrows.setDocid(docid);
		borrows.setUid(u_id);
		LocalDate localDate = LocalDate.now();
		borrows.setBorrowtime(localDate);
		final Documents updatedDocuemnt = documentsRepository.save(document);
		final borrows updatedBorrows = borrowsRepository.save(borrows);

		return ResponseEntity.ok(updatedDocuemnt);
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/returndocuments/{docid}/{u_id}")
	public ResponseEntity<Documents> returndocument(@PathVariable(value = "docid") String docid,@PathVariable(value = "u_id") String u_id,
			@Valid @RequestBody Documents docdetails) throws ResourceNotFoundException {
		Documents document = documentsRepository.findByDocid(docid)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + docid));
	
		
		borrows borrows= borrowsRepository.findByDocid(docid);

	
		final Documents updatedDocuemnt = documentsRepository.save(document);
		if (borrows != null) {
			document.setDoc_noofcopiesavailable(document.getDoc_noofcopiesavailable()+1);

			 borrowsRepository.delete(borrows);

		}
		else {
			throw new ResourceNotFoundException("Document Not Borrowed");
		}
		return ResponseEntity.ok(updatedDocuemnt);
	}
//
	@DeleteMapping("/documents/{docid}")
	public Map<String, Boolean> deleteDocument(@PathVariable(value = "docid") String docid)
			throws ResourceNotFoundException {
		Documents document = documentsRepository.findByDocid(docid)
				.orElseThrow(() -> new ResourceNotFoundException("Document not found for this id :: " + docid));

		documentsRepository.delete(document);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@PostMapping("/signin")
    public Map<String, String> authenticateUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
		List<LoginAuth> login = loginRepository.findIdByUsername(loginDto.getUsername());


        // get token form tokenProvider
        String token = tokenProvider.generateToken(authentication);
		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		response.put("u_id", Long.toString(login.get(0).getId()));
		return response;        

    }
}
