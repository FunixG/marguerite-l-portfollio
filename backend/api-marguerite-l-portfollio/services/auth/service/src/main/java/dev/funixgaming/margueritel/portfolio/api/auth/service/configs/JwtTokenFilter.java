package dev.funixgaming.margueritel.portfolio.api.auth.service.configs;

import dev.funixgaming.margueritel.portfolio.api.auth.service.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain chain) throws ServletException, IOException {
        final String bearerTokenHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (Strings.isEmpty(bearerTokenHeader) || !bearerTokenHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        final String[] tokenParts = bearerTokenHeader.split(" ");
        if (tokenParts.length != 2) {
            chain.doFilter(request, response);
            return;
        }

        final String token = tokenParts[1].trim();

        try {
            if (this.jwtService.isTokenValid(token)) {
                final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken("admin", null, null);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                authentication.setAuthenticated(true);

                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request, response);
            } else {
                chain.doFilter(request, response);
            }
        } catch (Exception _) {
            chain.doFilter(request, response);
        }
    }
}
