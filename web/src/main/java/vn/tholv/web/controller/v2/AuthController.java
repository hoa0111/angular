package vn.tholv.web.controller.v2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.tholv.web.core.base.constant.Token;
import vn.tholv.web.core.base.dto.AuthRequest;
import vn.tholv.web.core.base.service.JwtService;
import vn.tholv.web.core.override.util.VerifyCaptcha;

import java.net.MalformedURLException;
import java.util.Map;

@RestController
@RequestMapping("/v2")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private VerifyCaptcha verifyCaptcha;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, VerifyCaptcha verifyCaptcha) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.verifyCaptcha = verifyCaptcha;

    }

    @PostMapping("/auth")
    public Map authenticateAndGetToken(@RequestBody AuthRequest authRequest) throws MalformedURLException {
        if(!verifyCaptcha.verify(authRequest.getRecaptcha())){
            throw new RuntimeException("Xác thực captcha thất bại");
        }
        try {
            Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                if (Boolean.FALSE.equals(authRequest.getRememberMe())) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    Map<String, Object> result = Map.of(Token.ACCESS_TOKEN, Token.TOKEN_TYPE_BEARER + token, "username", authRequest.getUsername());
                    return result;
                } else {
                    String token = jwtService.generateRefreshToken(authRequest.getUsername());
                    Map<String, Object> result = Map.of(Token.REFRESH_TOKEN, Token.TOKEN_TYPE_BEARER + token, "username", authRequest.getUsername());
                    return result;
                }
            }
            throw new RuntimeException("Đăng nhập thất bại");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đăng nhập thất bại");
        }
    }
}
