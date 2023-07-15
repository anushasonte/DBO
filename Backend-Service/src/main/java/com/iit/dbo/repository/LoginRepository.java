package com.iit.dbo.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iit.dbo.model.LoginAuth;

import java.util.List;
import java.util.Optional;
@Repository
public interface LoginRepository extends JpaRepository<LoginAuth, Long> {
   
    Optional<LoginAuth> findByUsername(String username);
    
    public static final String FIND_USERTYPE = "SELECT * FROM librarymanagement.login_auth";

    @Query(value = FIND_USERTYPE, nativeQuery = true)
    public List<LoginAuth>  findUserTypes();
    
    public static final String FIND_USERID = "SELECT * FROM librarymanagement.login_auth WHERE username = :username";
    public List<LoginAuth>  findIdByUsername(String username);

}
