package mn.itzone.ntc;

import mn.itzone.ntc.NtcWebApplication;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = NtcWebApplication.class)
@WebAppConfiguration
public class NtcWebApplicationTests {

	@Test
	public void contextLoads() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		String password = encoder.encode("password");
		System.out.println(password);
		System.out.println(java.util.UUID.randomUUID().toString());
	}

}
