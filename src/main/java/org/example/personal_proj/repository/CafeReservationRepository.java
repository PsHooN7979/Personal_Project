package org.example.personal_proj.repository;

import org.example.personal_proj.entity.CafeReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CafeReservationRepository extends JpaRepository<CafeReservationEntity, Long> {

    List<CafeReservationEntity> findByUserIdx(Long idx);

    // 특정 사용자의 모든 예약목록을 조회하며 카페의 이름과 주소도 함께 가져옴
    @Query("SELECT r FROM CafeReservationEntity r JOIN FETCH r.cafe c WHERE r.user.idx = :idx")
    List<CafeReservationEntity> findAllReservation(@Param("idx") Long idx);

}
