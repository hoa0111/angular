package vn.tholv.web.core.base.dao;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import vn.tholv.web.core.base.dao.core.Dao;
import vn.tholv.web.core.base.entity.User;

@Repository
public interface UserDao extends Dao<User,Integer> {
    UserDetails findByUsername(String s);
}
