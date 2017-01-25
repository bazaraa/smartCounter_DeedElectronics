package mn.mnba.mnba;

import mn.mnba.mnba.MnbaWebApplication;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MnbaWebApplication.class)
@WebAppConfiguration
public class MnbaWebApplicationTests {

	@Test
	public void contextLoads() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		String password = encoder.encode("password");
		System.out.println(password);
		System.out.println(java.util.UUID.randomUUID().toString());
	}

}