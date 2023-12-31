package vn.tholv.web.core.base.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import vn.tholv.web.core.override.util.CloneObject;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
	private String SECRET;

	public JwtServiceImpl(@Value("${jwt.secret}") String secret) {
		this.SECRET = secret;
	}

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts
			.parserBuilder()
			.setSigningKey(getSignKey())
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date(System.currentTimeMillis()));
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}


	public String generateToken(String userName) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userName, 1);
	}

	@Override
	public String generateRefreshToken(String userName) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userName, 30);
	}

    private String createToken(Map<String, Object> claims, String userName, int days) {
        long exp = Instant.now().plusSeconds(60 * 60 * 24 * days).toEpochMilli();
        Date expiration = new Date(exp);
		return Jwts.builder()
			.setClaims(claims)
			.setSubject(userName)
			.setIssuedAt(new Date())
			.setExpiration(expiration)
			.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
	}

	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
