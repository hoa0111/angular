package vn.tholv.web.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;

import static java.util.TimeZone.getTimeZone;

@Configuration
public class ResponseConfig {
	public static final String DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
	public static final String TIME_ZONE = "GMT+7";
	// tholv added

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		return objectMapper;
	}
}