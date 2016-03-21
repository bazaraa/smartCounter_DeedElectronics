/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.multisection = !0, scheduler.config.multisection_shift_all = !0, scheduler.config.section_delemiter = ",", scheduler.attachEvent("onSchedulerReady", function() {
    var e = scheduler._update_unit_section;
    scheduler._update_unit_section = function(t) {
        return scheduler._update_sections(t, e)
    };
    var t = scheduler._update_timeline_section;
    scheduler._update_timeline_section = function(e) {
        return scheduler._update_sections(e, t)
    }, scheduler.isMultisectionEvent = function(e) {
        if (e && this._get_multisection_view()) {
            var t = this._get_event_sections(e);
            return t.length > 1
        }
        return !1
    }, scheduler._get_event_sections = function(e) {
        var t = this._get_section_property(),
            s = e[t] || "";
        return this._parse_event_sections(s)
    }, scheduler._parse_event_sections = function(e) {
        return e instanceof Array ? e : e.toString().split(scheduler.config.section_delemiter)
    }, scheduler._register_copies_array = function(e) {
        for (var t = 0; t < e.length; t++) this._register_copy(e[t])
    }, scheduler._register_copy = function(e) {
        this._multisection_copies[e.id] || (this._multisection_copies[e.id] = {});
        var t = e[this._get_section_property()],
            s = this._multisection_copies[e.id];
        s[t] || (s[t] = e)
    }, scheduler._get_copied_event = function(e, t) {
        if (!this._multisection_copies[e]) return null;
        if (this._multisection_copies[e][t]) return this._multisection_copies[e][t];
        var s = this._multisection_copies[e];
        if (scheduler._drag_event && scheduler._drag_event._orig_section && s[scheduler._drag_event._orig_section]) return s[scheduler._drag_event._orig_section];
        var r = 1 / 0,
            a = null;
        for (var n in s) s[n]._sorder < r && (a = s[n], r = s[n]._sorder);
        return a
    }, scheduler._clear_copied_events = function() {
        this._multisection_copies = {}
    }, scheduler._clear_copied_events(), scheduler._split_events = function(e) {
        var t = [],
            s = this._get_multisection_view(),
            r = this._get_section_property();
        if (s)
            for (var a = 0; a < e.length; a++) {
                var n = this._get_event_sections(e[a]);
                if (n.length > 1) {
                    for (var d = 0; d < n.length; d++)
                        if ("undefined" != typeof s.order[n[d]]) {
                            var i = this._lame_copy({}, e[a]);
                            i[r] = n[d], t.push(i)
                        }
                } else t.push(e[a])
            } else t = e;
        return t
    }, scheduler._get_multisection_view = function() {
        return this.config.multisection ? scheduler._get_section_view() : !1
    };
    var s = scheduler.get_visible_events;
    scheduler.get_visible_events = function() {
        this._clear_copied_events();
        var e = s.apply(this, arguments);
        if (this._get_multisection_view()) {
            e = this._split_events(e);
            for (var t = 0; t < e.length; t++) this.is_visible_events(e[t]) || (e.splice(t, 1), t--);
            this._register_copies_array(e)
        }
        return e
    }, scheduler._rendered_events = {};
    var r = scheduler.render_view_data;
    scheduler.render_view_data = function(e, t) {
        return this._get_multisection_view() && e && (e = this._split_events(e), this._restore_render_flags(e)), r.apply(this, [e, t])
    }, scheduler._restore_render_flags = function(e) {
        for (var t = this._get_section_property(), s = 0; s < e.length; s++) {
            var r = e[s],
                a = scheduler._get_copied_event(r.id, r[t]);
            if (a)
                for (var n in a) 0 === n.indexOf("_") && (r[n] = a[n])
        }
    }, scheduler._update_sections = function(e, t) {
        var s = e.view,
            r = e.event,
            a = e.pos;
        if (scheduler.isMultisectionEvent(r)) {
            if (scheduler._drag_event._orig_section || (scheduler._drag_event._orig_section = a.section), scheduler._drag_event._orig_section != a.section) {
                var n = s.order[a.section] - s.order[scheduler._drag_event._orig_section];
                if (n) {
                    var d = this._get_event_sections(r),
                        i = [],
                        l = !0;
                    if (scheduler.config.multisection_shift_all)
                        for (var _ = 0; _ < d.length; _++) {
                            var o = scheduler._shift_sections(s, d[_], n);
                            if (null === o) {
                                i = d, l = !1;
                                break
                            }
                            i[_] = o
                        } else
                            for (var _ = 0; _ < d.length; _++) {
                                if (d[_] == a.section) {
                                    i = d, l = !1;
                                    break
                                }
                                if (d[_] == scheduler._drag_event._orig_section) {
                                    var o = scheduler._shift_sections(s, d[_], n);
                                    if (null === o) {
                                        i = d, l = !1;
                                        break
                                    }
                                    i[_] = o
                                } else i[_] = d[_]
                            }
                    l && (scheduler._drag_event._orig_section = a.section), r[scheduler._get_section_property()] = i.join(",")
                }
            }
        } else t.apply(scheduler, [e])
    }, scheduler._shift_sections = function(e, t, s) {
        for (var r = null, a = e.y_unit, n = 0; n < a.length; n++)
            if (a[n].key == t) {
                r = n;
                break
            }
        var d = a[r + s];
        return d ? d.key : null
    };
    var a = scheduler._get_blocked_zones;
    scheduler._get_blocked_zones = function(e, t, s, r, n) {
        if (t && this.config.multisection) {
            t = this._parse_event_sections(t);
            for (var d = [], i = 0; i < t.length; i++) d = d.concat(a.apply(this, [e, t[i], s, r, n]));
            return d
        }
        return a.apply(this, arguments)
    };
    var n = scheduler._check_sections_collision;
    scheduler._check_sections_collision = function(e, t) {
        if (this.config.multisection && this._get_section_view()) {
            e = this._split_events([e]), t = this._split_events([t]);
            for (var s = !1, r = 0, a = e.length; a > r && !s; r++)
                for (var d = 0, i = t.length; i > d; d++)
                    if (n.apply(this, [e[r], t[d]])) {
                        s = !0;
                        break
                    }
            return s
        }
        return n.apply(this, arguments)
    }
});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multisection.js.map